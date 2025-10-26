import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Typography, Space, Input, Spin } from 'antd';
import { 
  TrendingUp, 
  FileText, 
  DollarSign, 
  Calendar,
  Zap,
  Send,
  Bot,
  User,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { theme } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { useChatQuery } from '../services/chat';
import UserAvatar from '../components/UserAvatar';
import CombinedDataRenderer from '../components/CombinedDataRenderer';
import DataFiltersDrawer from '../components/DataFiltersDrawer';
import styles from '../styles/ChatPage.module.css';
import drawerStyles from '../styles/DataFiltersDrawer.module.css';
import { PrimaryButton, SecondaryButton } from '../components/StandardButtons';

const { Title, Text } = Typography;

const ChatPage = () => {
  const { token } = theme.useToken();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Use the chat query service
  const executeQueryMutation = useChatQuery();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set up global handler for follow-up queries
  useEffect(() => {
    window.handleFollowUpQuery = (query) => {
      // Direct implementation to avoid circular dependency
      if (!query || isLoading) return;

      // Ensure content is a string
      const safeQuery = typeof query === 'string' ? query : String(query);

      // Add user message
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: safeQuery,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      // Execute query using the service
      executeQueryMutation.mutate(safeQuery, {
        onSuccess: (data) => {
          // Add bot response to messages
          const botMessage = {
            id: Date.now(),
            type: 'bot',
            content: data.result,
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
        },
        onError: (error) => {
          console.error('Error executing query:', error);
          // Add error message to chat
          const errorMessage = {
            id: Date.now(),
            type: 'error',
            content: 'Error while getting response. Try again.',
            timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            originalQuery: safeQuery
          };
          setMessages(prev => [...prev, errorMessage]);
          setIsLoading(false);
        }
      });
    };

    return () => {
      window.handleFollowUpQuery = null;
    };
  }, [isLoading, executeQueryMutation]);

  const handleSendMessage = (query = null) => {
    const messageContent = query || inputValue.trim();
    if (!messageContent || isLoading) return;

    // Ensure content is a string
    const safeContent = typeof messageContent === 'string' ? messageContent : String(messageContent);

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: safeContent,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    const currentQuery = safeContent;
    setInputValue('');
    setIsLoading(true);

    // Execute query using the service
    executeQueryMutation.mutate(currentQuery, {
      onSuccess: (data) => {
        // Add bot response to messages
        const botMessage = {
          id: Date.now(),
          type: 'bot',
          content: data.result,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      },
      onError: (error) => {
        console.error('Error executing query:', error);
        // Add error message to chat
        const errorMessage = {
          id: Date.now(),
          type: 'error',
          content: 'Error while getting response. Try again.',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          originalQuery: currentQuery
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      }
    });
  };

  const handlePromptClick = async (query) => {
    if (!query.trim() || isLoading) return;

    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Execute query using the service
    executeQueryMutation.mutate(query.trim(), {
      onSuccess: (data) => {
        // Add bot response to messages
        const botMessage = {
          id: Date.now(),
          type: 'bot',
          content: data.result,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      },
      onError: (error) => {
        console.error('Error executing query:', error);
        // Add error message to chat
        const errorMessage = {
          id: Date.now(),
          type: 'error',
          content: 'Error while getting response. Try again.',
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          originalQuery: query.trim()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageContent = (content, messageType) => {
    try {
      const parsedContent = JSON.parse(content);
      
      // Handle new array format
      if (Array.isArray(parsedContent)) {
        // Check if there are follow-up queries
        const followUpQueries = parsedContent.find(item => item.type === 'follow_up_queries');
        const otherContent = parsedContent.filter(item => item.type !== 'follow_up_queries');
        
        return {
          content: <CombinedDataRenderer data={otherContent} />,
          followUpQueries: followUpQueries
        };
      }
      
      if (parsedContent.type === 'combined') {
        return {
          content: <CombinedDataRenderer data={parsedContent} />,
          followUpQueries: null
        };
      }
    } catch (error) {
      // If not JSON or parsing fails, render as text
    }

    // Render as text
    return {
      content: <div>{content}</div>,
      followUpQueries: null
    };
  };

  const suggestedPrompts = [
    {
      icon: <TrendingUp size={20} />,
      text: "Compare revenue trends across all quarters",
      query: "Compare revenue trends across all quarters"
    },
    {
      icon: <FileText size={20} />,
      text: "Show me my top restaurant by revenue this month",
      query: "Show me my top restaurant by revenue this month"
    },
    {
      icon: <DollarSign size={20} />,
      text: "What numbers have seen bizarre fall as compared to same time last year?",
      query: "What numbers have seen bizarre fall as compared to same time last year?"
    },
    {
      icon: <Calendar size={20} />,
      text: "Predict revenue for the next 3 months",
      query: "Predict revenue for the next 3 months"
    }
  ];

  // Show landing page when there are no messages
  if (messages.length === 0) {
    return (
      <div className={`${styles.container} ${drawerStyles.chatContainer} ${drawerOpen ? drawerStyles.drawerOpen : ''}`}>
        <div className={styles.landingContent}>
          {/* AI-Powered Analytics Badge */}
          <div className={styles.badge}>
            <Space size={8}>
              <Zap size={16} />
              <Text className={styles.badgeText}>AI-Powered Analytics</Text>
            </Space>
          </div>

          {/* Greeting */}
          <Title level={1} className={styles.greeting}>
            Hi {user?.firstName}
          </Title>

          {/* Tagline */}
          <Text className={styles.tagline}>
            Welcome to the Future of Analytics
          </Text>

          {/* Suggested Prompts */}
          <div className={styles.promptsContainer}>
            {suggestedPrompts.map((prompt, index) => (
              <Card
                key={index}
                className={styles.promptCard}
                hoverable={!isLoading}
                onClick={() => !isLoading && handlePromptClick(prompt.query)}
              >
                <div className={styles.promptContent}>
                  <div className={styles.promptIcon}>
                    {prompt.icon}
                  </div>
                  <Text className={styles.promptText}>
                    {prompt.text}
                  </Text>
                  <div className={styles.promptArrow}>
                    →
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Input Field */}
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Ask anything..."
              className={styles.inputField}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button
              type="primary"
              className={styles.sendButton}
              icon={<Send size={16} />}
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
            />
          </div>
        </div>
        
        {/* Toggle Button */}
        <SecondaryButton 
          icon={drawerOpen ? <ChevronRight className={drawerStyles.toggleIcon} size={24} /> : <ChevronLeft className={drawerStyles.toggleIcon} size={24}/>}
          onClick={toggleDrawer}
          className={drawerStyles.toggleButton + ' ' + (drawerOpen ? drawerStyles.open : drawerStyles.closed)}
        />
        
        {/* Data Filters Drawer */}
        <DataFiltersDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    );
  }
  // Show chat interface when there are messages
  return (
    <div className={`${styles.container} ${drawerStyles.chatContainer} ${drawerOpen ? drawerStyles.drawerOpen : ''}`}>

      {/* Chat Messages */}
      <div className={styles.chatArea}>
        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <div key={message.id}>
              <div
                className={`${styles.messageWrapper} ${message.type === 'user' ? styles.userMessage : styles.botMessage}`}
              >
                {message.type === 'user' ? (
                  <>
                    <div className={styles.messageBubbleUser}>
                      <div className={styles.messageText}>
                        {typeof message.content === 'string' ? message.content : String(message.content)}
                      </div>
                      <div className={styles.messageTime}>
                        {message.timestamp}
                      </div>
                    </div>
                    <div className={styles.userAvatar}>
                      <UserAvatar clerkId={user?.id} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.botAvatar}>
                      <Sparkles size={20} color="#3b82f6" />
                    </div>
                    <div className={styles.messageBubbleBot}>
                      <div className={styles.messageText}>
                        {renderMessageContent(message.content, message.type).content}
                      </div>
                      <div className={styles.messageTime}>
                        {message.timestamp}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Render follow-up queries separately for bot messages */}
              {message.type === 'bot' && renderMessageContent(message.content, message.type).followUpQueries && (
                <div className={styles.followUpQueriesContainer}>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '12px',
                    justifyContent: 'flex-start',
                    marginTop: '8px'
                  }}>
                    {renderMessageContent(message.content, message.type).followUpQueries.queries.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (window.handleFollowUpQuery) {
                            window.handleFollowUpQuery(query);
                          }
                        }}
                        style={{
                          background: 'rgba(59, 130, 246, 0.05)',
                          border: '1px solid rgba(59, 130, 246, 0.12)',
                          borderRadius: '12px',
                          padding: '12px 16px',
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#1e293b',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontFamily: 'inherit',
                          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                          minHeight: '44px',
                          maxWidth: '100%',
                          textAlign: 'left',
                          lineHeight: '1.4'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.08)';
                          e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                          e.target.style.color = '#1e40af';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(59, 130, 246, 0.05)';
                          e.target.style.borderColor = 'rgba(59, 130, 246, 0.12)';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                          e.target.style.color = '#1e293b';
                        }}
                      >
                        {query}
                        <span style={{ 
                          fontSize: '14px', 
                          marginLeft: '4px', 
                          opacity: 0.6,
                          flexShrink: 0
                        }}>↗</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
              <div className={styles.botAvatar}>
                <Sparkles size={20} color="#3b82f6" />
              </div>
              <div className={styles.messageBubbleBot}>
                <div className={styles.thinkingContainer}>
                  <div className={styles.thinkingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <Text className={styles.thinkingText}>Thinking...</Text>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Ask a follow-up question..."
            className={styles.inputField}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            type="primary"
            className={styles.sendButton}
            icon={<Send size={16} />}
            onClick={() => handleSendMessage()}
            loading={isLoading}
            disabled={!inputValue.trim() || isLoading}
          />
        </div>
      </div>
      
      {/* Toggle Button */}
      <button 
        className={`${drawerStyles.toggleButton} ${drawerOpen ? drawerStyles.open : ''}`}
        onClick={toggleDrawer}
      >
        {drawerOpen ? <ChevronRight className={drawerStyles.toggleIcon} /> : <ChevronLeft className={drawerStyles.toggleIcon} />}
      </button>
      
      {/* Data Filters Drawer */}
      <DataFiltersDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default ChatPage;