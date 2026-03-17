package com.pizzastore.menuservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pizzastore.menuservice.entity.MenuItem;

@Repository
public interface MenuRepository extends JpaRepository<MenuItem,Long> {
	List<MenuItem> findByAvailableTrueAndStockGreaterThan(int stock);
}
