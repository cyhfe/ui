import * as Form from '.';

export default function Demo() {
  return (
    <Form.Root
      onSubmit={async (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        const formData = new FormData(form);

        const errors = new Set();
        if (!(formData.get('email') as string).includes('@gmail.com'))
          errors.add('email');
        if (!(formData.get('password') as string).includes('#'))
          errors.add('password');

        window.alert(JSON.stringify(Object.fromEntries(formData), null, 2));
      }}
    >
      <Form.Field name="email">
        <Form.Label>email</Form.Label>
        <Form.Control type="email" required />
        <Form.Message match="valueMissing" />
        <Form.Message match="typeMismatch">Email is invalid</Form.Message>
      </Form.Field>

      <Form.Field name="password">
        <Form.Label>custom validity</Form.Label>
        <Form.Control type="password" required />
        <Form.Message match="valueMissing">Password is required</Form.Message>
        <Form.Message match={(value) => value.match(/.*[0-9]+.*/) === null}>
          Password is not complex enough
        </Form.Message>
      </Form.Field>

      <Form.Field name="async">
        <Form.Label>async custom validity</Form.Label>
        <Form.Control type="text" required />
        <Form.Message match="valueMissing">async is required</Form.Message>
        <Form.Message
          match={async (value) => {
            await wait(1000);
            return value !== 'aaa123';
          }}
        >
          value must be aaa123
        </Form.Message>
      </Form.Field>

      <Form.Submit>Submit</Form.Submit>
      <button type="reset">Reset</button>
    </Form.Root>
  );
}

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// export const Demo = () => {
//   const [loading, setLoading] = React.useState(false);
//   const [serverErrors, setServerErrors] = React.useState<{
//     email?: boolean;
//     password?: boolean;
//   }>({});

//   return (
//     <>
//       <Form.Root
//         className={formClass()}
//         onClearServerErrors={() => setServerErrors({})}
//         onSubmit={async (event) => {
//           const form = event.currentTarget;
//           event.preventDefault();

//           const formData = new FormData(form);

//           setLoading(true);
//           await wait(500);
//           setLoading(false);

//           const errors = new Set();
//           if (!(formData.get('email') as string).includes('@gmail.com'))
//             errors.add('email');
//           if (!(formData.get('password') as string).includes('#'))
//             errors.add('password');

//           if (errors.size > 0) {
//             setServerErrors(
//               Object.fromEntries([...errors].map((name) => [name, true])),
//             );
//             return;
//           }

//           window.alert(JSON.stringify(Object.fromEntries(formData), null, 2));
//         }}
//       >
//         <Form.Field name="email" serverInvalid={serverErrors.email}>
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             required
//             onChange={() =>
//               setServerErrors((prev) => ({ ...prev, email: false }))
//             }
//           />
//           <Form.Message match="valueMissing" />
//           <Form.Message match="typeMismatch" forceMatch={serverErrors.email}>
//             Email is invalid
//           </Form.Message>
//         </Form.Field>

//         <Form.Field name="password" serverInvalid={serverErrors.password}>
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             required
//             onChange={() =>
//               setServerErrors((prev) => ({ ...prev, password: false }))
//             }
//           />
//           <Form.Message match="valueMissing">Password is required</Form.Message>
//           <Form.Message
//             match={(value) => value.match(/.*[0-9]+.*/) === null}
//             forceMatch={serverErrors.password}
//           >
//             Password is not complex enough
//           </Form.Message>
//           {serverErrors.password && <Form.Message>Woops</Form.Message>}
//         </Form.Field>

//         <Form.Submit disabled={loading}>Submit</Form.Submit>
//         <button type="reset">Reset</button>
//       </Form.Root>
//     </>
//   );
// };

// export default Demo;
