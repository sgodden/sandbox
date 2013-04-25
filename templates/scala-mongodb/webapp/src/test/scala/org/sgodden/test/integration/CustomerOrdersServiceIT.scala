package org.sgodden.test.integration

import org.testng.Assert
import org.apache.http.impl.client.DefaultHttpClient
import org.apache.http.entity.StringEntity
import org.codehaus.jackson.map.{SerializationConfig, ObjectMapper}
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import org.apache.http.client.methods.{HttpGet, HttpPost}
import org.apache.http.{HttpEntity, HttpResponse}
import java.io.{InputStreamReader, BufferedReader}
import org.testng.annotations.Test
import org.slf4j.LoggerFactory
import org.sgodden.tom.web.{ListEntry, ListResponse}
import org.joda.time.LocalDate

@Test(groups = Array("integration"))
class CustomerOrdersServiceIT {

  private def LOG = LoggerFactory.getLogger(classOf[CustomerOrdersServiceIT])

  private val baseUri = "http://localhost:8080/services/customer-orders"

  @Test(priority = 1)
  def shouldBeNoOrders: Unit = {
    Assert.assertEquals(listOrders.size, 0)
  }

  @Test(priority = 2)
  def testCreateOrder: Unit = {
    val order = new ListEntry(
      id = null,
      customerReference = "cr001",
      orderNumber = "ORD001",
      bookingDate = new LocalDate)

    val response = postOrder(order)
    printErrorsIfExist(response)
    Assert.assertTrue(response.success)

    val returned = response.customerOrders.head
    Assert.assertNotNull(returned)
  }

  @Test(priority = 2)
  def customerReferenceMustBeginWithCrOnCreate: Unit = {
    val order = new ListEntry(
      id = null,
      customerReference = "CREF001",
      orderNumber = "ORD001",
      bookingDate = new LocalDate)

    val response = postOrder(order)
    Assert.assertFalse(response.success)
    Assert.assertTrue(containsError(response.errors, "customerReference", "Customer reference must begin with 'cr'"))
  }
  
  private def printErrorsIfExist(response: ListResponse) {
    if (!response.success) println(response.errors.head.message)
  }

  private def postOrder(order: ListEntry): ListResponse = {
    val client = new DefaultHttpClient
    val post = new HttpPost(baseUri) {
      setEntity(new StringEntity(objectMapper.writeValueAsString(order)) {
        setContentType("application/json")
      })
    }
    toListOrdersResponse(client.execute(post))
  }
  
  private def toListOrdersResponse(response: HttpResponse): ListResponse = {
    objectMapper.reader(classOf[ListResponse]).readValue(getResponseString(response.getEntity))
  }

  private def listOrders: Array[ListEntry] = {
    val ordersString = getListOrdersResponse
    val ret: Array[ListEntry] = objectMapper.reader(classOf[Array[ListEntry]]).readValue(ordersString)
    ret
  }

  private def objectMapper: ObjectMapper = {
    new ObjectMapper {
      configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false)
      withModule(new DefaultScalaModule)
    }
  }

  private def getListOrdersResponse: String = {
    val client = new DefaultHttpClient
    val get = new HttpGet(baseUri)
    val response = client.execute(get)
    getResponseString(response.getEntity)
  }

  private def getResponseString(entity: HttpEntity): String = {
    if (entity == null) {
      return null
    }
    val reader = new BufferedReader(new InputStreamReader(entity.getContent))
    val ret = new StringBuilder
    var line: String = null
    while ((({
      line = reader.readLine; line
    })) != null) {
      ret.append(line)
    }
    ret.toString()
  }


  private def containsError(
                                 errors: Set[org.sgodden.tom.web.Error],
                                 path: String,
                                 message: String): Boolean = {
    errors.filter(error => path == error.path && message == error.message).size > 0
  }



}