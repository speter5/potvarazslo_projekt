function Error({ statusCode }) {
  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center">
      <title suppressHydrationWarning>PótVarázsló</title>

      <h1 className="text-white text-3xl mt-80 ">Hiba történt: {statusCode}</h1>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
