'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

// method to verify if user has access to a workspace or not
export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    const hasAccess = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkId: user?.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkId: user?.id,
                },
              },
            },
          },
        ],
      },
    });
    return {
      status: 200,
      data: { workSpace: hasAccess },
    };
  } catch (err) {
    return {
      status: 403,
      data: {
        workspace: null,
      },
    };
  }
};

// method to get all the folders of a workspace.
export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const workspaceFolders = await client.folder.findMany({
      where: {
        workspaceId: workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    // case when workspace has no folder
    if (workspaceFolders && !workspaceFolders.length) {
      return {
        status: 200,
        data: {
          workspaceFolders: [],
        },
      };
    }

    // case when workspace has more than one folder in it
    if (workspaceFolders && workspaceFolders.length) {
      return {
        status: 200,
        data: {
          workspaceFolders,
        },
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: {
        workspaceFolders: null,
      },
    };
  }
};

// method to get all the videos of a user
export const getAllUserVideos = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    const userVideos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId: workspaceId }, { folderId: workspaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (!userVideos) {
      return {
        status: 200,
        userVideos: [],
      };
    }

    if (userVideos && userVideos.length) {
      return {
        status: 200,
        data: {
          userVideos,
        },
      };
    }
  } catch (error) {
    return {
      status: 500,
    };
  }
};
