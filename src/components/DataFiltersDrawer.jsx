import React, { useState, useEffect } from 'react';
import { Select, Input, Typography, Space, Spin, Table, Tag } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useFinancialReportsOptions, useFinancialReportsData } from '../services/financialReports';
import DefaultLoader from './DefaultLoader';
import styles from '../styles/DataFiltersDrawer.module.css';

const { Title, Text } = Typography;
const { Option } = Select;

const DataFiltersDrawer = ({ visible, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [entity, setEntity] = useState('');

  // Use the financial reports options API
  const { data: optionsData, isLoading: optionsLoading, error: optionsError } = useFinancialReportsOptions();

  // Extract data from API response
  const entities = optionsData?.entities || [];
  const timePeriods = optionsData?.time_periods || [];

  // Auto-select 0th index for both dropdowns when data loads
  useEffect(() => {
    if (timePeriods.length > 0 && !timePeriod) {
      setTimePeriod(timePeriods[0].time_period_label);
    }
    if (entities.length > 0 && !entity) {
      setEntity(entities[0].entity);
    }
  }, [optionsData]); // Removed timePeriod and entity from dependencies to prevent infinite loop

  // Use the financial reports data API when both selections are made
  const { data: reportsData, isLoading: reportsLoading, error: reportsError } = useFinancialReportsData(
    timePeriod,
    entity,
    !!timePeriod && !!entity
  );

  // Ensure reportsData is an array for the table
  const tableData = Array.isArray(reportsData?.reports) ? reportsData.reports : [];

  // Filter entities based on search term (for dropdown)
  const filteredEntities = entities.filter(item =>
    item.entity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter time periods based on search term (for dropdown)
  const filteredTimePeriods = timePeriods.filter(item =>
    item.time_period_label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter table data based on search term
  const filteredTableData = tableData.filter(item =>
    item.metric_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to format value based on metric_type
  const formatValue = (value, metricType) => {
    if (value === null || value === undefined) return '-';
    
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    
    switch (metricType?.toLowerCase()) {
      case 'percentage':
        return `${numValue}%`;
      case 'currency':
      case 'amount':
        return `₹${numValue.toLocaleString()}`;
      case 'count':
        return numValue.toLocaleString();
      default:
        return numValue.toLocaleString();
    }
  };

  // Define table columns for reports data
  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric_name',
      key: 'metric_name',
      width: '25%',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '20%',
      render: (text, record) => (
        <Text strong>{formatValue(text, record.metric_type)}</Text>
      ),
    },
      {
        title: 'Labels',
        dataIndex: 'labels',
        key: 'labels',
        width: '35%',
        render: (labels) => (
          <div className={styles.labelsContainer}>
            {labels && labels.length > 0 ? (
              labels.map((label, index) => (
                <Tag key={index} color="green" size="small" className={styles.labelTag}>
                  {label}
                </Tag>
              ))
            ) : (
              <Text type="secondary">-</Text>
            )}
          </div>
        ),
      },
    {
      title: 'Hierarchy',
      dataIndex: 'statement_type',
      key: 'statement_type',
      width: '20%',
      render: (text, record) => (
        <Text>{record.statement_type}-{record.sub_entity} ({record.page_number})</Text>
      ),
    },
  ];

  // Check if we're loading anything
  const isLoading = optionsLoading || reportsLoading;

  // Debug logging
  useEffect(() => {
    if (reportsData) {
      console.log('Reports data received:', reportsData);
      console.log('Reports array:', reportsData.reports);
      console.log('Is reports array?', Array.isArray(reportsData.reports));
      console.log('Table data:', tableData);
      console.log('Filtered table data:', filteredTableData);
      console.log('Search term:', searchTerm);
      if (tableData.length > 0) {
        console.log('Sample record:', tableData[0]);
        console.log('Sample metric_type:', tableData[0]?.metric_type);
        console.log('Sample labels:', tableData[0]?.labels);
        console.log('Sample hierarchy:', `${tableData[0]?.statement_type} ${tableData[0]?.sub_entity}`);
      }
    }
  }, [reportsData, tableData, filteredTableData, searchTerm]);

  return (
    <div className={`${styles.drawer} ${visible ? styles.open : styles.closed}`}>
      <div className={styles.drawerContent}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <FilterOutlined />
          </div>
          <div className={styles.headerText}>
            <Title level={4} className={styles.title}>Data Filters</Title>
            <Text className={styles.subtitle}>Select period and entity</Text>
          </div>
        </div>

        {/* Dropdowns */}
        <div className={styles.filtersSection}>
          <div className={styles.filterGroup}>
            <Text className={styles.filterLabel}>Time Period</Text>
            <Select
              value={timePeriod}
              onChange={setTimePeriod}
              className={styles.select}
              suffixIcon={<span className={styles.chevron}>▼</span>}
              loading={isLoading}
              showSearch
              placeholder="Select time period"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {filteredTimePeriods.map(period => (
                <Option key={period.time_period_label} value={period.time_period_label}>
                  {period.time_period_label}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Text className={styles.filterLabel}>Entity</Text>
            <Select
              value={entity}
              onChange={setEntity}
              className={styles.select}
              suffixIcon={<span className={styles.chevron}>▼</span>}
              loading={isLoading}
              showSearch
              placeholder="Select entity"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {filteredEntities.map(entityOption => (
                <Option key={entityOption.entity} value={entityOption.entity}>
                  {entityOption.entity}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Search */}
        <div className={styles.searchSection}>
          <Input
            placeholder="Search metrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            prefix={<SearchOutlined className={styles.searchIcon} />}
            className={styles.searchInput}
          />
        </div>

        {/* Reports Table */}
        {timePeriod && entity && (
          <div className={styles.tableSection}>
            {reportsLoading ? (
              <DefaultLoader />
            ) : reportsError ? (
              <div className={styles.errorContainer}>
                <Text className={styles.errorText}>Failed to load reports data. Please try again.</Text>
              </div>
            ) : reportsData ? (
              <Table
                columns={columns}
                dataSource={filteredTableData}
                pagination={false}
                size="small"
                className={styles.table}
                showHeader={true}
                scroll={{ y: 400 }}
              />
            ) : null}
          </div>
        )}

        {/* Options Loading State */}
        {optionsLoading && (
          <div className={styles.loadingContainer}>
            <DefaultLoader />
          </div>
        )}
        
        {/* Options Error State */}
        {optionsError && (
          <div className={styles.errorContainer}>
            <Text className={styles.errorText}>Failed to load options data. Please try again.</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataFiltersDrawer;
