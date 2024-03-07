import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '@server/trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { PrismaService } from '@server/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(this.constructor.name);

  usersRouter = this.trpcService.router({
    getMany: this.trpcService.publicProcedure.query(async () => {
      return await this.prismaService.user.findMany({});
    }),
    getOne: this.trpcService.publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await this.prismaService.user.findUnique({
          where: { id: input.id },
        });
      }),
    create: this.trpcService.publicProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async ({ input }) => {
        return await this.prismaService.user.create({
          data: { name: input.name },
        });
      }),
  });

  appRouter = this.trpcService.router({
    user: this.usersRouter,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext: ({}) => {
          // add your auth logic here

          return {
            errorMsg: null,
          };
        },
        middleware: (req, res, next) => {
          next();
        },
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
