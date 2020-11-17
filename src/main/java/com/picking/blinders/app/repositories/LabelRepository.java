package com.picking.blinders.app.repositories;

import com.picking.blinders.app.models.Box;
import com.picking.blinders.app.models.Label;
import com.picking.blinders.app.models.State;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long> {

    List<Label> findByPrintedFalseAndBoxOrderZone(String zone);

    List<Label> findByPrintedFalse();

    List<Label> findByPrintedTrue();

    List<Label> findByPrintedTrueAndBoxOrderZone(String zone);

    //List<Label> findByPrintedTrueAndBoxState_IdAndBox(Long state_id);

    //List<Label> findByPrintedTrueAndBoxOrderZoneAndBoxState_Id(String zone, Long state_id);

    List<Label> findByPrintedTrueAndBoxOrderZoneAndBoxState(String zone, State state);

}
