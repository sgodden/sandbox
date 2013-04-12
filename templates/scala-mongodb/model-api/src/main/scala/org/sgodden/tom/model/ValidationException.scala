package org.sgodden.tom.model

import javax.validation.ConstraintViolation

@SuppressWarnings(Array("serial"))
class ValidationException(val violations: Set[ConstraintViolation[AnyRef]]) extends RuntimeException {

}
