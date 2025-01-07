'use server';

import { currentUser } from '@clerk/nextjs/server';
import { client } from '@/lib/prisma';

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const existingUser = await client.user.findUnique({
      where: {
        clerkId: user?._id,
      },
    });
  } catch (error) {}
};