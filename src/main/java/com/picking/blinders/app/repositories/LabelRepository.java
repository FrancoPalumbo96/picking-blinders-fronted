package com.picking.blinders.app.repositories;

import com.picking.blinders.app.models.Label;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {

    List<Label> findByPrintedFalseAndBoxOrderZone(String zone);

    List<Label> findByPrintedFalse();

}