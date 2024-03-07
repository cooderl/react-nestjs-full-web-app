const configuration = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const port = process.env.PORT;
  const host = process.env.HOST;

  return {
    server: { isProd, port, host },
  };
};

export default configuration;

export type ConfigurationType = ReturnType<typeof configuration>;
