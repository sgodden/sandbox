package org.sgodden.tom.model

class CustomerOrderLine {
  private var packageType: String = null
  private var descriptionOfGoods: String = null

  def getPackageType = packageType

  def setPackageType(packageType: String) {
    this.packageType = packageType
  }

  def getDescriptionOfGoods = descriptionOfGoods

  def setDescriptionOfGoods(descriptionOfGoods: String) {
    this.descriptionOfGoods = descriptionOfGoods
  }
}
