package org.sgodden.test.integration

import org.testng.Assert
import org.apache.http.impl.client.DefaultHttpClient
import org.apache.http.entity.StringEntity
import org.codehaus.jackson.map.{SerializationConfig, ObjectMapper}
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import org.apache.http.client.methods.{HttpGet, HttpPost}
import org.apache.http.{HttpEntity, HttpResponse}
import java.io.{InputStreamReader, BufferedReader}
import org.testng.annotations.{BeforeClass, Test}
import org.slf4j.LoggerFactory
import org.sgodden.tom.web.{BaseResponse, PostResponse, ListEntry, GetResponse}
import org.joda.time.LocalDate
import com.mongodb.casbah.commons.conversions.scala.{RegisterJodaTimeConversionHelpers, RegisterConversionHelpers}

@Test
class CustomerOrdersServiceIT {

  private def LOG = LoggerFactory.getLogger(classOf[CustomerOrdersServiceIT])

  private val baseUri = "http://localhost:8080/services/customer-orders"

  RegisterConversionHelpers()
  RegisterJodaTimeConversionHelpers()

  @Test(priority = 1)
  def shouldBeNoOrders: Unit = {
    IntegrationTestHelper.dropDB
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

    val returned = response.customerOrder
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

  @Test(priority = 3)
  def shouldBeOneOrder {
    Assert.assertEquals(listOrders.size, 1)
  }

  @Test(priority = 4)
  def canUpdateAnOrder {
    val order = listOrders.head
    val newOrder = order.copy(orderNumber = order.orderNumber + "XXX")
    Assert.assertTrue(putOrder(newOrder).success)
    Assert.assertEquals(listOrders.head.orderNumber, newOrder.orderNumber)
  }

  private def printErrorsIfExist(response: BaseResponse) {
    if (!response.success) println(response.errors.head.message)
  }

  private def postOrder(order: ListEntry): PostResponse = {
    val client = new DefaultHttpClient
    val post = new HttpPost(baseUri) {
      setEntity(new StringEntity(objectMapper.writeValueAsString(order)) {
        setContentType("application/json")
      })
    }
    toPostResponse(client.execute(post))
  }

  private def putOrder(order: ListEntry): PostResponse = {
    val client = new DefaultHttpClient
    val post = new HttpPost(baseUri) {
      setEntity(new StringEntity(objectMapper.writeValueAsString(order)) {
        setContentType("application/json")
      })
    }
    toPostResponse(client.execute(post))
  }

  private def toListOrdersResponse(response: HttpResponse): GetResponse = {
    objectMapper.reader(classOf[GetResponse]).readValue(getResponseString(response.getEntity))
  }

  private def toPostResponse(response: HttpResponse): PostResponse =
    objectMapper.reader(classOf[PostResponse]).readValue(getResponseString(response.getEntity))

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
                                 errors: Array[org.sgodden.tom.web.Error],
                                 path: String,
                                 message: String): Boolean = {
    errors.filter(error => path == error.path && message == error.message).size > 0
  }



}