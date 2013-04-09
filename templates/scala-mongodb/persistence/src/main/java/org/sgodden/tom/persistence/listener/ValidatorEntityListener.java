package org.sgodden.tom.persistence.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.io.Serializable;
import java.util.Set;

public class ValidatorEntityListener {
    
    private static final Logger LOG = LoggerFactory.getLogger(ValidatorEntityListener.class);

	private static Validator validator = Validation
			.buildDefaultValidatorFactory().getValidator();

	@PrePersist
	@PreUpdate
	public void validate(Serializable entity) {
		Set<ConstraintViolation<Serializable>> constraints = validator.validate(entity);
		if (constraints.size() > 0) {
            if (LOG.isDebugEnabled()) {
                for (ConstraintViolation<Serializable> violation : constraints) {
                    LOG.debug(violation.toString());
                }
            }
			//throw new ValidationException(constraints);
		}
	}

}
