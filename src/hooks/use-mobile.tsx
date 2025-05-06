import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
		undefined
	);

	React.useEffect(() => {
		const mqlMobile = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`
		);
		const onChangeMobile = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mqlMobile.addEventListener("change", onChangeMobile);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mqlMobile.removeEventListener("change", onChangeMobile);
	}, []);

	return !!isMobile;
}

export function useIsTablet() {
	const [isTablet, setIsTablet] = React.useState<boolean | undefined>(
		undefined
	);

	React.useEffect(() => {
		const mqlTablet = window.matchMedia(
			`(max-width: ${TABLET_BREAKPOINT - 1}px)`
		);
		const onChangeTablet = () => {
			setIsTablet(
				window.innerWidth >= MOBILE_BREAKPOINT &&
					window.innerWidth < TABLET_BREAKPOINT
			);
		};
		mqlTablet.addEventListener("change", onChangeTablet);
		setIsTablet(
			window.innerWidth >= MOBILE_BREAKPOINT &&
				window.innerWidth < TABLET_BREAKPOINT
		);
		return () => mqlTablet.removeEventListener("change", onChangeTablet);
	}, []);

	return !!isTablet;
}
