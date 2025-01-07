'use server';

import { currentUser } from '@clerk/nextjs/server';
import { client } from '@/lib/prisma';

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    console.log('From clerk: currentUser : ', currentUser);
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
    // user already exists return it
    if (userExists) {
      return { status: 200, user: userExists };
    }
    // else case create user
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
    return { status: 500 };
  }
};
