package org.sgodden.tom.model

case class CustomerOrderLine(
    packageType: String,
    descriptionOfGoods: String)
  extends ICustomerOrderLine {

}
