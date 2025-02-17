import HomeIcon from '@/components/global/sidebar/sidebarItemsIcons/HomeIcon';
import LibraryIcon from '@/components/global/sidebar/sidebarItemsIcons/LibraryIcon';
import NotificationsIcon from '@/components/global/sidebar/sidebarItemsIcons/NotificationsIcon';
import BillingsIcon from '@/components/global/sidebar/sidebarItemsIcons/BillingsIcon';
import SettingsIcon from '@/components/global/sidebar/sidebarItemsIcons/SettingsIcon';

export const MENU_ITEMS = (
  workspaceId: string
): { title: string; href: string; icon: React.ReactNode }[] => [
  { title: 'Home', href: `/dashboard/${workspaceId}/home`, icon: <HomeIcon /> },
  {
    title: 'My Library',
    href: `/dashboard/${workspaceId}`,
    icon: <LibraryIcon />,
  },
  {
    title: 'Notifications',
    href: `/dashboard/${workspaceId}/notifications`,
    icon: <NotificationsIcon />,
  },
  {
    title: 'Billings',
    href: `/dashboard/${workspaceId}/billing`,
    icon: <BillingsIcon />,
  },
  {
    title: 'Settings',
    href: `/dashboard/${workspaceId}/settings`,
    icon: <SettingsIcon />,
  },
];
