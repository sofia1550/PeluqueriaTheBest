import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchProductOrders,
  createProductOrder,
  createProductOrderMercadoPago, 
  selectAllProductOrders,
  getProductOrderStatus,
  getProductOrderError,
  updateOrderStatus,
} from "@/redux/features/productOrder/productOrderSlice";
import { selectIsAdmin } from "@/redux/authSelectors";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import {
  CloseButton,
  ModalHeader,
  OrderContainer,
  OrderItem,
  OrderHeader,
  OrderDetails,
  StyledModalContainer,
  TableWrapper,
  ToggleButton,
} from "./orderModelStyles";
import {
  Button,
  StatusLabel,
  StatusOption,
  StatusSelect,
  StatusSelectContainer,
} from "../orders/ordersModalStyled";

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectAllProductOrders);
  const orderStatus = useAppSelector(getProductOrderStatus);
  const orderError = useAppSelector(getProductOrderError);
  const isAdmin = useAppSelector(selectIsAdmin);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("pendiente");
  const [paymentMethod, setPaymentMethod] = useState<string>("deposito"); 
  const [formData, setFormData] = useState<FormData | null>(null); 

  useEffect(() => {
    if (open) {
      dispatch(fetchProductOrders());
    }
  }, [dispatch, open]);

  const handleToggle = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleStatusChange = (orderId: number) => {
    dispatch(updateOrderStatus({ id: orderId, status: selectedStatus }));
  };

  const handleCreateOrder = () => {
    if (paymentMethod === "deposito" && formData) {
      dispatch(createProductOrder(formData)); 
    } else {
      // Para Mercado Pago, crea un objeto con los datos necesarios
      const orderData = {
        user_id: 1, 
        phone_number: "123456789",
        total: 100,
        products: [], 
        shipping_method: "delivery",
        address: "Calle Falsa 123",
        city: "Ciudad Falsa",
        payment_method: "mercadopago",
        status: "pendiente", 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(createProductOrderMercadoPago(orderData));
    }
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; 
    link.rel = "noopener noreferrer"; 
    link.click();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledModalContainer>
        <ModalHeader>Órdenes de Compra</ModalHeader>
        {orderStatus === "loading" && <CircularProgress color="inherit" />}
        {orderStatus === "failed" && <p>Error: {orderError}</p>}
        {orderStatus === "succeeded" && orders.length > 0 && (
          <TableWrapper>
            {orders.map((order) => (
              <OrderContainer key={order.id}>
                <OrderHeader onClick={() => handleToggle(order.id)}>
                  <span>
                    <strong>ID:</strong> {order.id}
                  </span>
                  <span>{order.user?.nombre || "Usuario desconocido"}</span>
                  <ToggleButton>
                    {expandedOrderId === order.id ? "▲" : "▼"}
                  </ToggleButton>
                </OrderHeader>
                {expandedOrderId === order.id && (
                  <OrderDetails>
                    <OrderItem>
                      <strong>Email:</strong>{" "}
                      {order.user?.email || "Email no disponible"}
                    </OrderItem>
                    <OrderItem>
                      <strong>Teléfono:</strong> {order.phone_number}
                    </OrderItem>
                    <OrderItem>
                      <strong>Total:</strong> $
                      {typeof order.total === "number"
                        ? order.total.toFixed(2)
                        : parseFloat(order.total).toFixed(2)}
                    </OrderItem>
                    <OrderItem>
                      <strong>Método de Envío:</strong>{" "}
                      {order.shipping_method === "delivery"
                        ? "Envío a domicilio"
                        : "Retirar en el local"}
                    </OrderItem>
                    {order.shipping_method === "delivery" && (
                      <>
                        <OrderItem>
                          <strong>Dirección:</strong>{" "}
                          {order.address || "No disponible"}
                        </OrderItem>
                        <OrderItem>
                          <strong>Ciudad:</strong>{" "}
                          {order.city || "No disponible"}
                        </OrderItem>
                      </>
                    )}
                    <OrderItem>
                      <strong>Método de Pago:</strong>{" "}
                      {order.payment_method === "mercadopago"
                        ? "Mercado Pago"
                        : "Depósito"}
                    </OrderItem>
                    <OrderItem>
                      <strong>Status:</strong>
                      <StatusLabel status={order.status}>
                        {order.status}
                      </StatusLabel>
                    </OrderItem>
                    <OrderItem>
                      <strong>Fecha:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </OrderItem>
                    <OrderItem>
                      <strong>Productos:</strong>
                      <ul>
                        {order.products?.length > 0 ? (
                          order.products.map((product) => (
                            <li key={product.id}>
                              {product.name} - {product.OrderProducts.quantity}{" "}
                              unidades
                            </li>
                          ))
                        ) : (
                          <li>No hay productos en esta orden.</li>
                        )}
                      </ul>
                    </OrderItem>

                    {order.payment_proof_url && (
                      <OrderItem>
                        <strong>Comprobante de Pago:</strong>
                        <Button
                          onClick={() =>
                            handleDownload(order.payment_proof_url!)
                          }
                        >
                          Descargar Comprobante
                        </Button>
                      </OrderItem>
                    )}
                    {isAdmin && (
                      <StatusSelectContainer>
                        <label htmlFor="status-select">Cambiar estado:</label>
                        <StatusSelect
                          id="status-select"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <StatusOption value="pendiente">
                            Pendiente
                          </StatusOption>
                          <StatusOption value="aprobado">Aprobado</StatusOption>
                          <StatusOption value="rechazado">
                            Rechazado
                          </StatusOption>
                        </StatusSelect>
                        <Button onClick={() => handleStatusChange(order.id)}>
                          Actualizar Estado
                        </Button>
                      </StatusSelectContainer>
                    )}
                  </OrderDetails>
                )}
              </OrderContainer>
            ))}
          </TableWrapper>
        )}
        {orderStatus === "succeeded" && orders.length === 0 && (
          <p>No se encontraron órdenes.</p>
        )}
        <CloseButton onClick={onClose}>Cerrar</CloseButton>
      </StyledModalContainer>
    </Modal>
  );
};

export default OrderModal;