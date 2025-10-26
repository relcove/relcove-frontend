import React, { useState } from 'react';
import { Card, Typography, Space } from 'antd';
import { TrendingDown, TrendingUp, Minus, ChevronDown, ChevronRight } from 'lucide-react';
import { theme } from 'antd';
import GeneralTable from './GeneralTable';
import { formatCurrency, formatNumericCurrency, parseFormattedText } from '../utils/currency';
import styles from '../styles/CombinedDataRenderer.module.css';

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

// Thought Section Component
const ThoughtSection = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const { token } = useToken();

  return (
    <div className={styles.thoughtContainer}>
      <div 
        className={styles.thoughtHeader}
        onClick={() => setExpanded(!expanded)}
      >
        <Space>
          <span className={styles.thoughtText}>
            Thought for sometime
          </span>
          {expanded ? (
            <ChevronDown size={16} className={styles.chevronIcon} />
          ) : (
            <ChevronRight size={16} className={styles.chevronIcon} />
          )}
        </Space>
      </div>
      {expanded && (
        <div className={styles.thoughtContent}>
          <Paragraph style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
            {item.text}
          </Paragraph>
        </div>
      )}
    </div>
  );
};

const CombinedDataRenderer = ({ data }) => {
  const { token } = useToken();
  
  if (!data) {
    return null;
  }

  // Helper function to format currency in shortened form (100K, 50M, etc.)
  const formatShortCurrency = (value) => {
    // Remove commas and other formatting before parsing
    const cleanValue = String(value).replace(/[,\s]/g, '');
    const num = parseFloat(cleanValue);
    if (isNaN(num)) return value;
    
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    
    if (absNum >= 1000000000) {
      return `${sign}₹${(absNum / 1000000000).toFixed(1)}B`;
    } else if (absNum >= 1000000) {
      return `${sign}₹${(absNum / 1000000).toFixed(1)}M`;
    } else if (absNum >= 1000) {
      return `${sign}₹${(absNum / 1000).toFixed(1)}K`;
    } else {
      // For values less than 1000, just show the number with commas
      return `${sign}₹${absNum.toLocaleString()}`;
    }
  };

  // Helper function to get CSS class based on column count
  const getColumnClass = (columnCount) => {
    if (columnCount <= 2) return styles.twoColumns;
    if (columnCount === 3) return styles.threeColumns;
    if (columnCount === 4) return styles.fourColumns;
    if (columnCount === 5) return styles.fiveColumns;
    if (columnCount === 6) return styles.sixColumns;
    if (columnCount === 7) return styles.sevenColumns;
    if (columnCount === 8) return styles.eightColumns;
    return styles.manyColumns;
  };

  // Helper function to render formatted text
  const renderFormattedText = (text) => {
    const parsedParts = parseFormattedText(text);
    return parsedParts.map((part) => {
      if (part.type === 'bold') {
        return (
          <strong key={part.key} style={{ fontWeight: 600 }}>
            {part.content}
          </strong>
        );
      }
      // Apply currency formatting to regular text content
      return formatCurrency(part.content);
    });
  };

  // Helper function to determine trend icon and color
  const getTrendInfo = (percentChange) => {
    if (!percentChange || percentChange === '0.0%') {
      return { icon: <Minus size={12} />, color: token.colorTextSecondary };
    }
    
    const numericValue = parseFloat(percentChange.replace('%', ''));
    if (numericValue < 0) {
      return { icon: <TrendingDown size={12} />, color: token.colorError };
    } else {
      return { icon: <TrendingUp size={12} />, color: token.colorSuccess };
    }
  };

  // Handle single_value type
  const renderSingleValue = (singleValueData) => {
    // Handle new format where value is directly on the item
    if (singleValueData.value !== undefined) {
      const { value, unit } = singleValueData;
      return (
        <Card className={styles.tableCard} bordered={false}>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
              <Text style={{ fontSize: '32px', fontWeight: 700, color: token.colorText }}>
                {renderFormattedText(value)}
              </Text>
              {unit && (
                <Text style={{ fontSize: '16px', fontWeight: 500, color: token.colorTextSecondary }}>
                  {unit}
                </Text>
              )}
            </div>
          </div>
        </Card>
      );
    }
    
    // Handle legacy format
    const { value, unit, description } = singleValueData;
    return (
      <Card className={styles.tableCard} bordered={false}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            <Text style={{ fontSize: '32px', fontWeight: 700, color: token.colorText }}>
              {value !== null && value !== undefined 
                ? renderFormattedText(formatCurrency(value.toString()))
                : 'No data available'
              }
            </Text>
            <Text style={{ fontSize: '16px', fontWeight: 500, color: token.colorTextSecondary }}>
              {unit}
            </Text>
          </div>
          {description && (
            <div style={{ marginTop: '8px' }}>
              <Text style={{ fontSize: '14px', color: token.colorTextSecondary, lineHeight: 1.5 }}>
                {renderFormattedText(description)}
              </Text>
            </div>
          )}
        </div>
      </Card>
    );
  };

  // Handle table type
  const renderTable = (tableData) => {
    // Safety check for table data structure
    if (!tableData || !tableData.headers || !Array.isArray(tableData.headers)) {
      console.error('Invalid table data structure:', tableData);
      return (
        <Card className={styles.tableCard} bordered={false}>
          <Text>Invalid table data structure</Text>
        </Card>
      );
    }

    const columns = tableData.headers.map((header, index) => ({
      title: header,
      dataIndex: index,
      key: index,
      sorter: (a, b) => {
        const aVal = a[index];
        const bVal = b[index];
        
        // Handle numeric values - preserve negative sign
        const aStr = String(aVal).replace(/[₹$€£¥,]/g, '');
        const bStr = String(bVal).replace(/[₹$€£¥,]/g, '');
        const aNum = parseFloat(aStr);
        const bNum = parseFloat(bStr);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return aNum - bNum;
        }
        
        // Handle string values
        return String(aVal).localeCompare(String(bVal));
      },
      render: (text, record) => {
        // Convert to string to handle both strings and numbers
        const textStr = String(text);
        
        // Handle empty or null text
        if (!textStr || textStr === 'N/A' || textStr === '' || textStr === '0') {
          return <Text style={{ fontWeight: 500, color: token.colorTextSecondary }}>-</Text>;
        }
        
        // Check column type for proper formatting
        const columnType = tableData.column_types && tableData.column_types[index];
        const isCurrencyColumn = columnType === 'currency' || columnType === 'amount';
        const isPercentageColumn = columnType === 'percentage';
        
        // Format as currency if it's a currency column
        if (isCurrencyColumn) {
          return (
            <Text style={{ fontWeight: 500 }}>
              {formatShortCurrency(textStr)}
            </Text>
          );
        }
        
        // Format as percentage if it's a percentage column
        if (isPercentageColumn) {
          const numericValue = parseFloat(textStr);
          const formattedPercent = isNaN(numericValue) ? textStr : `${numericValue.toFixed(2)}%`;
          const trendInfo = getTrendInfo(formattedPercent);
          return (
            <div className={styles.percentCell}>
              <Space size={4}>
                {trendInfo.icon}
                <Text style={{ fontWeight: 500 }}>
                  {formattedPercent}
                </Text>
              </Space>
            </div>
          );
        }
        
        // Default rendering - just format text without currency symbols
        return (
          <Text style={{ fontWeight: 500 }}>
            {renderFormattedText(formatCurrency(textStr))}
          </Text>
        );
      },
      align: (() => {
        const columnType = tableData.column_types && tableData.column_types[index];
        if (columnType === 'currency' || columnType === 'amount' || columnType === 'percentage') {
          return 'right';
        }
        return 'left';
      })(),
    }));

    // Safety check for rows data
    if (!tableData.rows || !Array.isArray(tableData.rows)) {
      console.error('Invalid table rows structure:', tableData.rows);
      return (
        <Card className={styles.tableCard} bordered={false}>
          <Text>Invalid table rows structure</Text>
        </Card>
      );
    }

    const tableRows = tableData.rows.map((row, index) => ({
      key: index,
      ...row.reduce((acc, cell, cellIndex) => {
        acc[cellIndex] = cell;
        return acc;
      }, {})
    }));

    return (
      <div className={`${styles.modernTableCard} ${getColumnClass(tableData.headers.length)}`}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>
            <div className={styles.tableIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="5" height="5" rx="1" fill="#3b82f6"/>
                <rect x="9" y="2" width="5" height="5" rx="1" fill="#3b82f6"/>
                <rect x="2" y="9" width="5" height="5" rx="1" fill="#3b82f6"/>
                <rect x="9" y="9" width="5" height="5" rx="1" fill="#3b82f6"/>
              </svg>
            </div>
            <Title level={5} className={styles.tableTitleText}>
              {tableData.title || 'Data Table'}
            </Title>
          </div>
        </div>
        <GeneralTable
          columns={columns}
          dataSource={tableRows}
          loading={false}
          pagination={false}
          sortDirections={['ascend', 'descend']}
          showSorterTooltip={true}
        />
      </div>
    );
  };

  // Render individual data item based on type
  const renderDataItem = (item) => {
    switch (item.type) {
      case 'thought':
        return <ThoughtSection item={item}/>;
      
      case 'heading':
        return (
          <Title level={3} style={{ marginBottom: '16px', marginTop: 0, color: token.colorText }}>
            {renderFormattedText(item.text)}
          </Title>
        );
      
      case 'table':
        return renderTable(item);
      
      case 'single_value':
        return (
          <div>
            {item.title && (
              <Title level={4} style={{ marginBottom: '12px' }}>
                {renderFormattedText(item.title)}
              </Title>
            )}
            {renderSingleValue(item)}
          </div>
        );
      
      case 'paragraph':
        return (
          <Card bordered={false} style={{ marginBottom: '8px' }}>
            <Paragraph style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
              {renderFormattedText(item.text)}
            </Paragraph>
          </Card>
        );
      
      case 'summary':
        return (
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <div className={styles.summaryIcon}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" fill="#4285f4"/>
                  <path d="M4 6h8v1H4V6zm0 2h8v1H4V8zm0 2h6v1H4v-1z" fill="white"/>
                </svg>
              </div>
              <Title level={5} className={styles.summaryTitle}>Summary</Title>
            </div>
            <ul className={styles.summaryList}>
              {item.items && item.items.map((itemText, index) => (
                <li key={index} className={styles.summaryItem}>
                  {renderFormattedText(itemText)}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'multi_metric_dashboard':
        return (
          <div className={styles.multiMetricDashboard}>
            <div className={styles.dashboardHeader}>
              <Title level={4} className={styles.dashboardTitle}>{item.title}</Title>
              <p className={styles.dashboardDescription}>{item.description}</p>
            </div>
            <div className={styles.metricsGrid}>
              {item.metrics && item.metrics.map((metric, index) => (
                <div key={index} className={styles.metricCard}>
                  <div className={styles.metricName}>{metric.name}</div>
                  <div className={styles.metricValue}>
                    {metric.type === 'amount' ? formatShortCurrency(metric.value) : `${metric.value}%`}
                  </div>
                  {metric.trend && metric.trend_direction && (
                    <div className={`${styles.metricTrend} ${styles[metric.trend_direction]}`}>
                      <span className={styles.trendIcon}>
                        {metric.trend_direction === 'up' ? '↗' : '↘'}
                      </span>
                      <span className={styles.trendText}>{metric.trend}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'single_key_metric':
        return (
          <div className={styles.singleKeyMetric}>
            <div className={styles.keyMetricHeader}>
              <Title level={4} className={styles.keyMetricTitle}>{item.title}</Title>
              <p className={styles.keyMetricDescription}>{item.description}</p>
            </div>
            <div className={styles.keyMetricCard}>
              <div className={styles.keyMetricIcon}>
                {item.metric.icon === 'dollar' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#4285f4"/>
                    <path d="M12 6v12M9 9h6M9 15h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
              <div className={styles.keyMetricContent}>
                <div className={styles.keyMetricName}>{item.metric.name}</div>
                <div className={styles.keyMetricValue}>
                  {item.metric.type === 'amount' ? formatShortCurrency(item.metric.value) : `${item.metric.value}%`}
                </div>
                {item.metric.trend && item.metric.trend_direction && (
                  <div className={`${styles.keyMetricTrend} ${styles[item.metric.trend_direction]}`}>
                    <span className={styles.trendIcon}>
                      {item.metric.trend_direction === 'up' ? '↗' : '↘'}
                    </span>
                    <span className={styles.trendText}>{item.metric.trend}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'list':
        return (
          <div>
            {item.title && (
              <Title level={4} style={{ marginBottom: '12px' }}>
                {renderFormattedText(item.title)}
              </Title>
            )}
            <Card bordered={false} style={{ marginBottom: '8px' }}>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {item.items && item.items.map((listItem, index) => (
                  <li key={index} style={{ marginBottom: '8px', fontSize: '14px', lineHeight: 1.6 }}>
                    <Text>
                      {renderFormattedText(listItem)}
                    </Text>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        );
      
      default:
        return (
          <Card bordered={false}>
            <Text>Unknown data type: {item.type}</Text>
          </Card>
        );
    }
  };

  // Handle array of data items (new format)
  if (Array.isArray(data)) {
    return (
      <div className={styles.combinedDataContainer}>
        {data.map((item, index) => (
          <div key={index} style={{ marginBottom: '16px' }}>
            {renderDataItem(item)}
          </div>
        ))}
      </div>
    );
  }

  // Handle single object (legacy format)
  if (!data.content) {
    return null;
  }

  // Apply global formatting rules to all text content
  const formatAllText = (obj) => {
    if (typeof obj === 'string') {
      return obj.replace(/\\n/g, '\n');
    }
    if (Array.isArray(obj)) {
      return obj.map(item => formatAllText(item));
    }
    if (typeof obj === 'object' && obj !== null) {
      const formatted = {};
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
          formatted[key] = value.replace(/\\n/g, '\n');
        } else if (typeof value === 'object' && value !== null) {
          formatted[key] = formatAllText(value);
        } else {
          formatted[key] = value;
        }
      }
      return formatted;
    }
    return obj;
  };

  // Apply formatting to the entire data object
  const formattedData = formatAllText(data);

  // Main render logic for legacy format
  if (formattedData.type === 'single_value') {
    return (
      <div className={styles.combinedDataContainer}>
        <div className={styles.titleSection}>
          <Title level={4} className={styles.title}>
            {formattedData.title}
          </Title>
        </div>
        {renderSingleValue(formattedData.content)}
      </div>
    );
  }

  if (formattedData.type === 'table') {
    return (
      <div className={styles.combinedDataContainer}>
        <div className={styles.titleSection}>
          <Title level={4} className={styles.title}>
            {formattedData.title}
          </Title>
        </div>
        {renderTable(formattedData.content)}
      </div>
    );
  }

  // Handle combined type - check content keys
  if (formattedData.type === 'combined') {
    const { table, paragraph, single_value } = formattedData.content;
    
    return (
      <div className={styles.combinedDataContainer}>
        <div className={styles.titleSection}>
          <Title level={4} className={styles.title}>
            {formattedData.title}
          </Title>
        </div>
        {single_value && renderSingleValue(single_value)}
        {table && renderTable(table)}
        {paragraph && renderParagraph(paragraph)}
      </div>
    );
  }

  // Fallback for unknown types
  return (
    <div className={styles.combinedDataContainer}>
      <div className={styles.titleSection}>
        <Title level={4} className={styles.title}>
          {formattedData.title || 'Unknown Data Type'}
        </Title>
      </div>
      <Card className={styles.tableCard} bordered={false}>
        <Text>Unsupported data type: {formattedData.type}</Text>
      </Card>
    </div>
  );
};

export default CombinedDataRenderer;