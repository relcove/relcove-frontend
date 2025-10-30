import React, { useState } from "react";
import { Button, Space, theme, Typography, Tooltip, Modal, App } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { CreateButton } from "../StandardButtons";
import NewProductDrawer from "../NewProductDrawer";
import GeneralTable, { ProductCell, IdentifierCell, StatusCell, OwnerCell, DateCell, ActionsCell } from "../GeneralTable";
import { useProducts, useDeleteProduct } from "../../services/products";

const { Title } = Typography;

const ProductsSettingsTab = () => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Use React Query hooks
  const { data: products = [], isLoading, error } = useProducts();
  const deleteProductMutation = useDeleteProduct();

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsDrawerOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsDrawerOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (!productToDelete) return;
    
    deleteProductMutation.mutate(productToDelete.product_id, {
      onSuccess: () => {
        message.success('Product deleted successfully!');
        setDeleteModalVisible(false);
        setProductToDelete(null);
      },
      onError: (error) => {
        console.error('Error deleting product:', error);
        message.error(error.message || 'Failed to delete product. Please try again.');
        // Don't close modal on error so user can retry
      }
    });
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setProductToDelete(null);
  };

  const handleProductCreated = () => {
    // React Query will automatically update the cache
    setIsDrawerOpen(false);
  };

  const columns = [
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <ProductCell
          record={record}
          icon={record.product_icon}
          name={record.product_name}
          description={record.description}
        />
      ),
    },
    {
      title: "Identifier",
      dataIndex: "product_identifier",
      key: "product_identifier",
      render: (identifier) => <IdentifierCell identifier={identifier} />,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: false,
      render: (description) => (
        <div style={{ 
          fontSize: "14px", 
          color: "#6b7280", 
          lineHeight: "1.4",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word"
        }}>
          {description || "—"}
        </div>
      ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (owner) => <OwnerCell owner={owner} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <StatusCell status={status} />,
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => <DateCell date={date} />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <ActionsCell
          actions={[
            <Tooltip key="edit" title="Edit Product">
              <Button
                type="text"
                size="small"
                icon={<Edit size={14} />}
                onClick={() => handleEditProduct(record)}
                style={{ color: token.colorTextSecondary }}
              />
            </Tooltip>,
            <Tooltip key="delete" title="Delete Product">
              <Button
                type="text"
                size="small"
                icon={<Trash2 size={14} />}
                onClick={() => handleDeleteProduct(record)}
                style={{ color: token.colorError }}
              />
            </Tooltip>,
          ]}
        />
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <Title level={4} style={{ margin: 0, color: token.colorText }}>
            Products
          </Title>
          <p style={{ margin: "4px 0 0 0", color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>
            Manage your products and their configurations
          </p>
        </div>
        <CreateButton onClick={handleAddProduct}>
          Add Product
        </CreateButton>
      </div>

      <GeneralTable
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={isLoading}
        error={error}
        emptyStateTitle="No products found"
        emptyStateDescription="Get started by creating your first product."
        emptyStateActionLabel="Add Product"
        onEmptyStateAction={handleAddProduct}
        emptyStateIcon="plus"
        emptyStateSize="medium"
        showEmptyStateRefresh={true}
        onEmptyStateRefresh={() => window.location.reload()}
      />

      <NewProductDrawer
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingProduct(null);
        }}
        onProductCreated={handleProductCreated}
        editingProduct={editingProduct}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Product"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          loading: deleteProductMutation.isPending,
        }}
        cancelButtonProps={{
          disabled: deleteProductMutation.isPending,
        }}
      >
        <p>
          Are you sure you want to delete the product <strong>"{productToDelete?.product_name}"</strong>?
        </p>
        <p style={{ color: token.colorTextSecondary, fontSize: token.fontSizeSM }}>
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default ProductsSettingsTab;
