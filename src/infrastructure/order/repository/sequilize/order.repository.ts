import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }


  async find(id: string): Promise<Order> {

    const orderModel = await OrderModel.findOne({where:{id},include: ["items"]});    

    const ordemItem = new OrderItem(
      "1",
      "Product 1",
      10,
      "123",
      2
    );

    return new Order(
       orderModel.id,
       orderModel.customer_id,
       [ordemItem],
    );

  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    const ordemItem = new OrderItem(
      "1",
      "Product 1",
      10,
      "1",
      2
    );
    
    return orderModels.map((orderModel) => new Order(
      orderModel.id,
      orderModel.customer_id,
      [ordemItem]
    ));
  }
  
}
