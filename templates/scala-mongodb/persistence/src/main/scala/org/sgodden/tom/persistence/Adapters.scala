package org.sgodden.tom.persistence

import com.mongodb.casbah.commons.MongoDBObject
import com.mongodb.DBObject
import org.sgodden.tom.model._
import java.util.Calendar
import java.text.SimpleDateFormat
import org.bson.types.ObjectId
import org.joda.time.{DateTime, LocalDate}

object CustomerOrderAdapter extends BaseAdapter {

  def apply(order: ICustomerOrder) = {
    MongoDBObject(
      "_id" -> {if (order.getId == null) null else new ObjectId(order.getId)},
      "customerReference" -> order.getCustomerReference,
      "orderNumber" -> order.getOrderNumber,
      "status" -> order.getStatus.toString,
      "bookingDate" -> order.getBookingDate,
      "collectionDetails" -> CollectionDetailsAdapter(order.getCollectionDetails),
      "deliveryDetails" -> DeliveryDetailsAdapter(order.getDeliveryDetails)
    )
  }
  def apply(dbo: DBObject) = {
    new CustomerOrder {
      setId(dbo.get("_id").toString)
      setCustomerReference(getString(dbo, "customerReference"))
      setOrderNumber(getString(dbo, "orderNumber"))
      // should never be null
      setStatus(CustomerOrderStatus.withName(dbo.get("status").asInstanceOf[String]))
      setBookingDate(getCalendar(dbo, "bookingDate"))
      setCollectionDetails(CollectionDetailsAdapter(dbo.get("collectionDetails").asInstanceOf[DBObject]))
      setDeliveryDetails(DeliveryDetailsAdapter(dbo.get("deliveryDetails").asInstanceOf[DBObject]))
    }
  }
}

object CollectionDetailsAdapter {
  def apply(details: ICollectionDetails) = {
    if (details == null)
      null
    else
      MongoDBObject("address" -> AddressAdapter(details.getAddress))
  }
  def apply(dbo:DBObject) = {
    if (dbo == null)
      null
    else
      new CollectionDetails {
        setAddress(AddressAdapter(dbo.get("address").asInstanceOf[DBObject]))
      }
  }
}

object DeliveryDetailsAdapter {
  def apply(details: IDeliveryDetails) = {
    if (details == null)
      null
    else
      MongoDBObject("address" -> AddressAdapter(details.getAddress))
  }
  def apply(dbo:DBObject) = {
    if (dbo == null)
      null
    else
      new DeliveryDetails {
        setAddress(AddressAdapter(dbo.get("address").asInstanceOf[DBObject]))
      }
  }
}

object AddressAdapter extends BaseAdapter {
  def apply(address: IAddress) = {
    MongoDBObject(
      "line1" -> address.line1,
      "line2" -> address.line2,
      "line3" -> address.line3,
      "line4" -> address.line4,
      "town" -> address.town,
      "postalCode" -> address.postalCode
    )
  }
  def apply(dbo: DBObject) = {
    if (dbo == null)
      null
    else
      new Address(
        line1 = getString(dbo, "line1"),
        line2 = getString(dbo, "line2"),
        line3 = getString(dbo, "line3"),
        line4 = getString(dbo, "line4"),
        town = getString(dbo, "town"),
        postalCode = getString(dbo, "postalCode")
      ) {}
  }
}

class BaseAdapter {

  final val sdf: SimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd")

  def calendarToString(cal: DateTime)= "FIX JODA TIME"

  def stringToCalendar(s: String) = {
    new DateTime
  }

  def getString(dbo: DBObject, field: String) = {
    if (dbo.get(field) == null)
      null
    else
      dbo.get(field).asInstanceOf[String]
  }

  def getCalendar(dbo: DBObject, field: String) = {
    if (dbo.get(field) == null)
      null
    else
      dbo.get(field).asInstanceOf[DateTime]
  }

}

