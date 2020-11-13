package com.picking.blinders.app.repositories;

import com.picking.blinders.app.models.Box;
import com.picking.blinders.app.models.PickingList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PickingListRepository extends CrudRepository<PickingList, Long> {

    //PickingList getByBox_Id(Long box_id);
    PickingList findByBox_Id(Long box_id);

}
