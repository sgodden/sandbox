package org.sgodden.tom.model

import org.testng.annotations.Test
import org.testng.Assert._
import javax.validation.{ConstraintViolation, Validation}
import org.joda.time.DateTime

@Test
class CustomerOrderTest {

  private val validator = Validation.buildDefaultValidatorFactory.getValidator

  def testValidation() {
    assertEquals(validator.validate(new CustomerOrder).size, 2, "Wrong number of violations")
  }

  def customerReferenceMustNotBeNull() {
    assertTrue(containsViolation(getViolations(new CustomerOrder), "customerReference", "may not be null"))
  }

  def customerReferenceMustBeginWithCr() {
    val order = new CustomerOrder {
      setOrderNumber("ordnum")
      setCustomerReference("foo")
      setBookingDate(new DateTime)
    }
    // TODO - message should be i18nd
    assertTrue(containsViolation(getViolations(order), "customerReference", "Customer reference must begin with 'cr'"))

    order.setCustomerReference("cr001")
    assertFalse(containsViolation(getViolations(order), "customerReference", "Customer reference must begin with 'cr'"))
  }

  private def getViolations(order: CustomerOrder) = {
    val rawViolations = validator.validate(order)
    rawViolations.toArray[ConstraintViolation[CustomerOrder]](
      new Array[ConstraintViolation[CustomerOrder]](rawViolations.size))
  }

  private def containsViolation(
                                 violations: Array[ConstraintViolation[CustomerOrder]],
                                 path: String,
                                 message: String): Boolean = {
    violations.filter(cv => path == cv.getPropertyPath.toString && message == cv.getMessage).size > 0
  }

}