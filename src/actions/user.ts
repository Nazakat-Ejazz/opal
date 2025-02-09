'use server';

import { currentUser } from '@clerk/nextjs/server';
import { client } from '@/lib/prisma';

export const onAuthenticateUser = async () => {
  console.log('From inside onAuthenticateUser!');
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const userExists = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workSpace: {
          where: {
            User: {
              clerkId: user.id,
            },
          },
        },
      },
    });

    console.log('userExists : ', userExists);
    // user already exists return it
    if (userExists) {
      return { status: 200, user: userExists };
    }
    // else case create user
    console.log('Have to create new user!');
    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workSpace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: 'PERSONAL',
          },
        },
      },
      include: {
        workSpace: {
          where: {
            User: {
              clerkId: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (newUser) {
      return {
        status: 201,
        user: newUser,
      };
    }
    return { status: 400 };
  } catch (error) {
    console.log('🔴 ERROR', error);
    return { status: 500 };
  }
};

export const getAllUserWorkspaces = async () => {
  console.log('Inside getAllUserWorkspaces action!');
  try {
    const user = await currentUser(); // this method from clerk will provide us currenlty logged in user.

    // if no user return unAuthorized
    if (!user) {
      return {
        status: 403,
      };
    }

    // if no user redirect to login page
    const userWorkspaces = await client.user.findUnique({
      where: {
        clerkId: user?.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workSpace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        memebers: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (userWorkspaces) {
      return {
        status: 200,
        userWorkspaces,
      };
    }
  } catch (error) {
    return {
      status: 500,
    };
  }
};

export const getAllUserNotifications = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 403,
      };
    }

    const userNotifications = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (!userNotifications) {
      return {
        status: 200,
        data: {
          userNotifications: [],
        },
      };
    }

    if (userNotifications) {
      return {
        status: 200,
        data: {
          userNotifications,
        },
      };
    }
  } catch (error) {
    return {
      status: 500,
    };
  }
};
