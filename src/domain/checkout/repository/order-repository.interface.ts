import RepositoryInterface from "../../@shared/repository/repository-interface";
import Order from "../entity/order";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
// create(entity: Product): Promise<void>;
// update(entity: Product): Promise<void>;
// find(id: string): Promise<Product>;
// findAll(): Promise<Product[]>;