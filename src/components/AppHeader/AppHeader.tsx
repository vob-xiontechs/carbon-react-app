import { Header, HeaderName } from '@carbon/react';

export default function AppHeader() {
  return (
    <Header aria-label="Carbon React App">
      <HeaderName href="/" prefix="My">
        App
      </HeaderName>
    </Header>
  );
}
