package org.sgodden.tom.web

import org.springframework.beans.factory.annotation.Autowired
import org.codehaus.jackson.map.{SerializationConfig, ObjectMapper}
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import org.sgodden.tom.model.{ICustomerOrderLine, ICustomerOrder, ValidationException}
import org.sgodden.tom.services.customerorder.CustomerOrderService
import org.joda.time.{LocalDate, DateTime}
import org.springframework.stereotype.Component
import javax.ws.rs._
import core.Response
import scala.collection.mutable

@Component
@Produces(Array("application/json"))
class CustomerOrdersController {

  @Autowired
  private val service: CustomerOrderService = null

  implicit def orderLineToOrderLine(orderLine: ICustomerOrderLine): OrderLine = {
    new OrderLine (
      packageType = orderLine.packageType,
      descriptionOfGoods = orderLine.descriptionOfGoods
    )
  }

  implicit def orderLinesToOrderLines(orderLines: Set[ICustomerOrderLine]): Array[OrderLine] = {
    {for (v <- orderLines) yield orderLineToOrderLine(v)}.toArray
  }

  implicit def orderToListEntry(order: ICustomerOrder): ListEntry = {
    new ListEntry (
      id = order.getId,
      customerReference = order.getCustomerReference,
      orderNumber = order.getOrderNumber,
      bookingDate = order.getBookingDate,
      orderLines = order.getOrderLines
    )
  }

  @GET
  def list: String = {
    generate(service.findAll.map(orderToListEntry(_)).toSet)
  }

  @GET
  @Path("/{id}")
  def get(@PathParam("id") id: String): String =
    generate(orderToListEntry(service.findById(id)))

  @DELETE
  @Path("/{id}")
  def delete(@PathParam("id") id: String) {
    service.remove(id)
  }

  @PUT
  def put(entryString: String) = {
    saveOrUpdate(entryString)
  }

  @POST
  def post(entryString: String) = {
    saveOrUpdate(entryString)
  }

  def saveOrUpdate(entryString: String): Response = {
    val entry: ListEntry = mapper.readValue(entryString, classOf[ListEntry])
    var responseOrder: ListEntry = null
    var success: Boolean = true
    var errors: Set[Error] = null
    var responseEntity: String = null

    try {
      var id = entry.id
      if (id == null || id == "") {
        val order = service.create
        entry merge order
        id = service persist order
      } else {
        val order = service findById id
        entry merge order
        service merge order
      }
      responseOrder = service findById id
      responseEntity = generate(new PostResponse(success = true, customerOrder = responseOrder))
    }
    catch {
      case ve: ValidationException => {
        success = false
        responseOrder = entry
        errors = getErrors(ve)
        responseEntity = generate(new PostResponse(success = false, errors = errors.toArray))
        return Response.status(Response.Status.BAD_REQUEST).entity(responseEntity).build()
      }
      case e: Exception => {
        throw new RuntimeException(e)
      }
    }
    // ok if we got here
    Response.ok(responseEntity).build()
  }
  
  private def getErrors(e: ValidationException) =
    e.violations.map(cv => new Error(cv.getPropertyPath.toString, cv.getMessage)).toSet

  private def getRootCause(e: Throwable): Throwable = {
    if (e.getCause == null) e
    else getRootCause(e.getCause)
  }

  // TODO - jackson generator configuration to not use millisecond timestamps, and scala config
  private final val mapper = {
    new ObjectMapper() {
      configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false)
      withModule(DefaultScalaModule)
    }
  }

  private def generate(o: AnyRef) = mapper.writeValueAsString(o)
}

case class ListEntry(
                    id: String,
                    customerReference: String,
                    orderNumber: String,
                    bookingDate: LocalDate,
                    orderLines: Array[OrderLine] = Array()) {
  def merge(order: ICustomerOrder) {
    order.setOrderNumber(orderNumber)
    order.setCustomerReference(customerReference)
    order.setBookingDate(bookingDate)
  }
}

case class OrderLine(packageType: String,
                    descriptionOfGoods: String)

abstract class BaseResponse() {
  def success: Boolean
  def errors: Array[Error]
}

case class GetResponse (success: Boolean, errors: Array[Error] = null, customerOrders: Array[ListEntry] = null) extends BaseResponse {
  def total = customerOrders.size
}

case class PostResponse ( success: Boolean,
                    errors: Array[Error] = null,
                    customerOrder: ListEntry = null) extends BaseResponse {
}

case class Error(path: String,  message:String)
