export type WorkspaceProps = {
  status: number;
  userWorkspaces: {
    subscription: {
      plan: 'FREE' | 'PRO';
    } | null;
    workSpace: {
      // Renamed from workspaces to match console output
      id: string;
      name: string;
      type: 'PERSONAL' | 'PUBLIC';
    }[];
    members: {
      // Changed from object to array of objects
      Workspace: {
        id: string;
        name: string;
        type: 'PUBLIC' | 'PERSONAL';
      };
    }[];
  };
};
