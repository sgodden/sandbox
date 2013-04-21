package org.sgodden.tom.persistence.model

import org.bson.types.ObjectId
import org.joda.time.{LocalDate, DateTime}
import org.sgodden.tom.model.{ICustomerOrderLine, CustomerOrderLine, CustomerOrder, ICustomerOrder}
import com.mongodb.DBObject
import scala.collection.mutable
import com.novus.salat._
import com.novus.salat.global._


case class CustomerOrderP(
    _id: ObjectId,
    customerReference: String, 
    orderNumber: String,
    bookingDate: DateTime,
    orderLines: Set[CustomerOrderLine]
                           ) {
  def asObject = {
    val ret = new CustomerOrder
    ret.setId(_id.toString)
    ret.setCustomerReference(customerReference)
    ret.setOrderNumber(orderNumber)
    ret.setBookingDate(new LocalDate(bookingDate.getMillis))
    orderLines.foreach(line => {
      ret.addOrderLine(line)
    })
    ret
  }
}

object CustomerOrderP {
  def apply(order: ICustomerOrder) = {
    new CustomerOrderP(
      _id = {if (order.getId != null) new ObjectId(order.getId) else null},
      customerReference = order.getCustomerReference,
      orderNumber = order.getOrderNumber,
      // fudge it to a date time as that's what is persisted
      bookingDate = new DateTime(order.getBookingDate.toDateMidnight.getMillis),

      /*
       * Relationships - ones that are already case classes just need casting to the concrete class
       */
      orderLines = order.getOrderLines.map(line => line.asInstanceOf[CustomerOrderLine])
    )
  }
}
