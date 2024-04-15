import { render, screen } from '@testing-library/react';
import response from '@/app/__mocks__/response';
import PATH_ROUTES from '@/app/_constants/pathRoutes';
import { vi } from 'vitest';
import AllPost from '../AllPost';

vi.mock('next/font/local', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    fontFamily: 'mocked-font-family',
  })),
}));

describe('블로그 게시물에 대한 테스트 코드 작성', () => {
  test('모든 게시물을 렌더링해야 함', async () => {
    render(<AllPost allPosts={response[PATH_ROUTES.get_all_posts].posts} />);

    expect(screen.getByText('메트로놈 라이브러리 컴포넌트 만들기')).toBeInTheDocument();
  });
});
