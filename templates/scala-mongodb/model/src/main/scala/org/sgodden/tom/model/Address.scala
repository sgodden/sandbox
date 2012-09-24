package org.sgodden.tom.model

import javax.validation.constraints.NotNull

class Address extends IAddress {
  @NotNull
  private var line1: String = null
  @NotNull
  private var line2: String = null
  private var line3: String = null
  private var line4: String = null
  @NotNull private var town: String = null
  private var postalCode: String = null

  override def getLine1: String = line1
  override def setLine1(line1: String) {
    this.line1 = line1
  }

  override def getLine2: String = line2
  override def setLine2(line2: String) {
    this.line2 = line2
  }

  override def getLine3: String = line3
  override def setLine3(line3: String) {
    this.line3 = line3
  }

  override def getLine4: String = line4
  override def setLine4(line4: String) {
    this.line4 = line4
  }

  override def getTown: String = town
  override def setTown(town: String) {
    this.town = town
  }

  override def getPostalCode: String = postalCode
  override def setPostalCode(postalCode: String) {
    this.postalCode = postalCode
  }

}
