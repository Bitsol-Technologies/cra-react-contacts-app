import { useRouteError } from "react-router-dom";

export const DefaultContactElement = () => {
  return <p id="zero-state">Select Contact Details from the sidebar.</p>;
};

export const DeleteContactErr = () => <div>Oops! There was an error.</div>;

export const ErrorPage = () => {
  //@ts-ignore
  const { error }: { error: any } = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || 'Something went wrong'}</i>
      </p>
    </div>
  );
};
