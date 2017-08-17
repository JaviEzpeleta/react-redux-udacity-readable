import React, { Component } from "react";
import * as Animated from "animated/lib/targets/react-dom";

const AnimatedWrapper = (WrappedComponent, distance, delay) => class AnimatedWrapper

extends Component {

	constructor(props) {
		super(props);
		this.state = {
			animate: new Animated.Value(0)
		};
		if (!distance) distance = '12'
		if (!delay) delay = '150'

			console.log('inside animated')
		console.log(props)
		if (props.position > 0) {
			delay = 150 * (props.position+1)
			console.log('setting delay as ' + delay)
		}
	}

	componentWillAppear(cb) {
		Animated.spring(this.state.animate, { toValue: 1 }).start()
		cb();
	}

	componentWillMount() {
		setTimeout(
			() => Animated.spring(this.state.animate, { toValue: 1 }).start(),
			delay
		);
//		Animated.spring(this.state.animate, { toValue: 1 }).start()
	}

	componentWillUnMount() {
		Animated.spring(this.state.animate, { toValue: 0 }).start()
	}

	componentWillEnter(cb) {
		setTimeout(
			() => Animated.spring(this.state.animate, { toValue: 1 }).start(),
			delay
		);
		cb();
	}

	componentWillLeave(cb) {
		Animated.spring(this.state.animate, { toValue: 0 }).start()
		setTimeout(() => cb(), 75)
	}

	render() {

		const style = {
			opacity: Animated.template`${this.state.animate}`,
			transform: Animated.template`
				translate3d(0,${this.state.animate.interpolate({
					inputRange: [0, 1],
					outputRange: [distance+"px", "0px"]
				})},0)
			`
		}

		return (
			<Animated.div style={style} className="animated-page-wrapper">
				<WrappedComponent {...this.props} />
			</Animated.div>
		)
	}

}

export default AnimatedWrapper;