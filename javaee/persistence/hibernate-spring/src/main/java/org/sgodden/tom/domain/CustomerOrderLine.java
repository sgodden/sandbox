package org.sgodden.tom.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;

/**
 * A line on a customer order.
 * 
 * @author Simon Godden
 */
@SuppressWarnings("serial")
@Entity
public class CustomerOrderLine implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    @Version
    private Long version;

	private String packageType;
	private String descriptionOfGoods;
	
	public Serializable getId() {
		return id;
	}

    public Long getVersion() {
        return version;
    }
        
	public String getPackageType() {
		return packageType;
	}
	public void setPackageType(String packageType) {
		this.packageType = packageType;
	}
	public String getDescriptionOfGoods() {
		return descriptionOfGoods;
	}
	public void setDescriptionOfGoods(String descriptionOfGoods) {
		this.descriptionOfGoods = descriptionOfGoods;
	}

}