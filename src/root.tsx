import { ExampleTest } from "./components/example/example";

export default () => {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        {"@qwikpen/utils"}
        <br />
        <ExampleTest flag={false} />
      </body>
    </>
  );
};
