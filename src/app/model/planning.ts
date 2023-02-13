import { Planningitem } from "./planningitem";

export interface Planning {
  
    monday?: Planningitem;
    tuesday?: Planningitem;
    wednesday?: Planningitem;
    thursday?: Planningitem;
    friday?: Planningitem;
    saturday?: Planningitem;
    sunday?: Planningitem;
}
