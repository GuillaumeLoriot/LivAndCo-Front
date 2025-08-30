import { HydraView } from './hydra-view.interface';

export interface HydraCollection<T> {
    'member': T[];
    'totalItems': number;
    'view'?: HydraView;
}