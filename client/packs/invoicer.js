import ReactOnRails from 'react-on-rails';

import Invoices from '../bundles/invoices/components/Invoices';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Invoices,
});
