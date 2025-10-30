import { message } from 'antd';

// Reusable success message system
export const showSuccessMessage = (action, entity = 'Product') => {
  const messages = {
    created: `${entity} created successfully!`,
    updated: `${entity} updated successfully!`,
    deleted: `${entity} deleted successfully!`,
    saved: `${entity} saved successfully!`,
  };

  const messageText = messages[action] || `${entity} ${action} successfully!`;
  
  message.success({
    content: messageText,
    duration: 3,
    style: {
      marginTop: '20px',
    },
  });
};

// Reusable error message system
export const showErrorMessage = (action, entity = 'Product', customMessage = null) => {
  const messages = {
    created: `Failed to create ${entity.toLowerCase()}. Please try again.`,
    updated: `Failed to update ${entity.toLowerCase()}. Please try again.`,
    deleted: `Failed to delete ${entity.toLowerCase()}. Please try again.`,
    saved: `Failed to save ${entity.toLowerCase()}. Please try again.`,
  };

  const messageText = customMessage || messages[action] || `Failed to ${action} ${entity.toLowerCase()}. Please try again.`;
  
  message.error({
    content: messageText,
    duration: 4,
    style: {
      marginTop: '20px',
    },
  });
};

// Reusable loading message system
export const showLoadingMessage = (action, entity = 'Product') => {
  const messages = {
    creating: `Creating ${entity.toLowerCase()}...`,
    updating: `Updating ${entity.toLowerCase()}...`,
    deleting: `Deleting ${entity.toLowerCase()}...`,
    saving: `Saving ${entity.toLowerCase()}...`,
  };

  const messageText = messages[action] || `${action} ${entity.toLowerCase()}...`;
  
  return message.loading({
    content: messageText,
    duration: 0, // Don't auto-dismiss loading messages
  });
};

// Product-specific message helpers
export const productMessages = {
  created: () => showSuccessMessage('created', 'Product'),
  updated: () => showSuccessMessage('updated', 'Product'),
  deleted: () => showSuccessMessage('deleted', 'Product'),
  createError: (customMessage) => showErrorMessage('created', 'Product', customMessage),
  updateError: (customMessage) => showErrorMessage('updated', 'Product', customMessage),
  deleteError: (customMessage) => showErrorMessage('deleted', 'Product', customMessage),
  creating: () => showLoadingMessage('creating', 'Product'),
  updating: () => showLoadingMessage('updating', 'Product'),
  deleting: () => showLoadingMessage('deleting', 'Product'),
};

export default {
  showSuccessMessage,
  showErrorMessage,
  showLoadingMessage,
  productMessages,
};
