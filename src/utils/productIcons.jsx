// Icon mapping for products
// This maps icon codes to Lucide React icons for consistent rendering
import { 
  Globe, 
  Smartphone, 
  Server, 
  Monitor, 
  Database, 
  Zap, 
  Shield, 
  Package, 
  Layers, 
  Cpu,
  Cloud,
  Lock,
  Settings,
  BarChart3,
  Users,
  FileText,
  Code,
  GitBranch,
  Terminal,
  Wifi
} from 'lucide-react';

export const PRODUCT_ICONS = {
  'globe': { component: Globe, label: 'Web Application' },
  'smartphone': { component: Smartphone, label: 'Mobile App' },
  'server': { component: Server, label: 'API Service' },
  'monitor': { component: Monitor, label: 'Desktop App' },
  'database': { component: Database, label: 'Database' },
  'zap': { component: Zap, label: 'Microservice' },
  'shield': { component: Shield, label: 'Security Service' },
  'package': { component: Package, label: 'Library' },
  'layers': { component: Layers, label: 'Platform' },
  'cpu': { component: Cpu, label: 'Infrastructure' },
  'cloud': { component: Cloud, label: 'Cloud Service' },
  'lock': { component: Lock, label: 'Auth Service' },
  'settings': { component: Settings, label: 'Configuration' },
  'bar-chart': { component: BarChart3, label: 'Analytics' },
  'users': { component: Users, label: 'User Management' },
  'file-text': { component: FileText, label: 'Documentation' },
  'code': { component: Code, label: 'Development Tool' },
  'git-branch': { component: GitBranch, label: 'Version Control' },
  'terminal': { component: Terminal, label: 'CLI Tool' },
  'wifi': { component: Wifi, label: 'Network Service' }
};

// Helper function to render icon from code
export const renderIconFromCode = (iconCode, size = 16, color = 'currentColor') => {
  const iconConfig = PRODUCT_ICONS[iconCode];
  if (!iconConfig) {
    return <Globe size={size} color={color} />;
  }
  const IconComponent = iconConfig.component;
  return <IconComponent size={size} color={color} />;
};

// Get all available icon codes
export const getAvailableIconCodes = () => Object.keys(PRODUCT_ICONS);
