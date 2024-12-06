/** import HomeCustomize from '@/components/home'; **/
import Portfolio from '@/components/portfolio';


/**
 * The root route of the application.
 *
 * This component renders the `PopMartCustomizer` component, which allows users to customize their Pop Mart figure.
 *
 * @returns The JSX element for the root route.
 */
export default function Home() {
  return (
    <main>
      <Portfolio />
    </main>
  );
}