package org.sgodden.tom.persistence.model

import org.bson.types.ObjectId
import org.joda.time.DateTime
import org.sgodden.tom.model.{ICustomerOrderLine, CustomerOrderLine, CustomerOrder, ICustomerOrder}

case class CustomerOrderP(
    _id: ObjectId,
    customerReference: String, 
    orderNumber: String,
    bookingDate: DateTime,
    orderLines: Set[ICustomerOrderLine]
                           ) {
  def asObject = {
    val ret = new CustomerOrder
    ret.setId(_id.toString)
    ret.setCustomerReference(customerReference)
    ret.setOrderNumber(orderNumber)
    ret.setBookingDate(bookingDate)
    ret
  }
}

object CustomerOrderP {
  def apply(order: ICustomerOrder) = {
    new CustomerOrderP(
      _id = {if (order.getId != null) new ObjectId(order.getId) else null},
      customerReference = order.getCustomerReference,
      orderNumber = order.getOrderNumber,
      bookingDate = order.getBookingDate,

      /*
       * Relationships - ones that are already case classes require no conversion
       */
      orderLines = order.getOrderLines
    )
  }
}
