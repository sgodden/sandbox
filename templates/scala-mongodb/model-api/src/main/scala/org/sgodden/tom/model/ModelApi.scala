package org.sgodden.tom.model

import org.joda.time.{LocalDate, DateTime}
import javax.validation.constraints.NotNull

trait ICustomerOrder extends Identity[ICustomerOrder] {

  def cancel

  def confirm

  def ship

  def getBookingDate: LocalDate
  def setBookingDate(cal: LocalDate)

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
  @NotNull
  val line1: String
  @NotNull
  val line2: String
  val line3: String
  val line4: String
  @NotNull
  val town: String
  val postalCode: String
}

trait ICustomerOrderLine {
  val packageType: String
  val descriptionOfGoods: String
}