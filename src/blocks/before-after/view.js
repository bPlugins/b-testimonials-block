import '../../shared/styles/frontend.scss';
import '../../shared/view';
import '../../shared/styles/before-after.scss';

// The slider itself needs no code here. `shared/view` mounts the same React
// BeforeAfterSlider the editor uses, so dragging, hover reveal, the vertical
// orientation and keyboard support all come from the component's own handlers.
//
// This entry used to bind a second set of pointer listeners to `.ba-wrap` and
// write `--pos` straight onto the element. React owns that inline style, so the
// two fought each other -- and because the manual pass never knew about
// orientation or the reveal mode, a vertical slider still moved sideways.
