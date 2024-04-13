import { afterEach, describe, expect, test, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { Match } from '../Match';

describe('Match', () => {
  afterEach(cleanup);
  test('should render edit and end button', () => {
    const screen = render(<Match score={'Home 0 - 5 Away'} onEditClick={() => {}} onEndClick={() => {}} />);
    expect(screen.getByTestId('edit-button')).toBeDefined();
    expect(screen.getByTestId('end-button')).toBeDefined();
  });
  test('should render score', () => {
    const screen = render(<Match score={'Home 0 - 5 Away'} onEditClick={() => {}} onEndClick={() => {}} />);
    expect(screen.getByText('Home 0 - 5 Away')).toBeDefined();
  });

  test('should call onEditClick when edit button is clicked', () => {
    const onEditClick = vi.fn();
    const screen = render(<Match score={'Home 0 - 5 Away'} onEditClick={onEditClick} onEndClick={() => {}} />);
    screen.getByTestId('edit-button').click();
    expect(onEditClick).toHaveBeenCalled();
  });
  test('should call onEndClick when end button is clicked', () => {
    const onEndClick = vi.fn();
    const screen = render(<Match score={'Home 0 - 5 Away'} onEditClick={() => {}} onEndClick={onEndClick} />);
    screen.getByTestId('end-button').click();
    expect(onEndClick).toHaveBeenCalled();
  });
});
