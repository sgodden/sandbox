package org.sgodden.tom.model

import org.joda.time.{LocalDate, DateTime}

trait ICustomerOrder extends Identity[ICustomerOrder] {

  def cancel

  def confirm

  def ship

  def getBookingDate: DateTime
  def setBookingDate(cal: DateTime)

  def getCustomerReference: String
  def setCustomerReference(reference: String)

  def getOrderNumber: String
  def setOrderNumber(orderNumber: String)

  def getCollectionDetails: ICollectionDetails
  def setCollectionDetails(details: ICollectionDetails)

  def getDeliveryDetails: IDeliveryDetails
  def setDeliveryDetails(details: IDeliveryDetails)

  def getOrderLines: Set[ICustomerOrderLine]
  def addOrderLine(line: ICustomerOrderLine)
  def removeOrderLine(line: ICustomerOrderLine)

  def getStatus: CustomerOrderStatus.Value
}

trait ICollectionDetails {
  def getAddress: IAddress
  def setAddress(address: IAddress)
}

trait IDeliveryDetails {
  def getAddress: IAddress
  def setAddress(address: IAddress)
}

trait IAddress {
  def getLine1: String
  def setLine1(line1: String)

  def getLine2: String
  def setLine2(line2: String)

  def getLine3: String
  def setLine3(line3: String)

  def getLine4: String
  def setLine4(line4: String)

  def getTown: String
  def setTown(town: String)

  def getPostalCode: String
  def setPostalCode(postalCode: String)
}

trait ICustomerOrderLine {
  val packageType: String
  val descriptionOfGoods: String
}