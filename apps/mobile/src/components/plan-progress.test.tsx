import { render } from '@testing-library/react-native';

import { PlanProgress } from './plan-progress';

describe('<PlanProgress />', () => {
  it('renders the completed and total counts', async () => {
    const screen = await render(<PlanProgress completed={2} total={3} />);

    expect(screen.getByText('2 / 3')).toBeTruthy();
    expect(screen.getByLabelText('2 of 3 commitments kept or recovered')).toBeTruthy();
  });
});
