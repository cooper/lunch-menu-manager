<?php

// years  are YYYY
// months are 1-12
// days   are 1-31

$year      = isset($_GET['year'])  ? $_GET['year']  + 0 : date('Y');
$month     = isset($_GET['month']) ? $_GET['month'] + 1 : date('n');
$monthName = date('F', mktime(0, 0, 0, $month, 10));

?>

<table class="lunch-calendar">
    <caption>
        <?php echo("$monthName $year"); ?>
        &mdash;
        <?php echo($breakfast ? 'Breakfast' : 'Lunch'); ?>
    </caption>
    <thead>
        <tr>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
        </tr>
    </thead>
    <tbody>

        <!-- one row of five days -->
        <tr>
            <td>
                <span class="day-number">2</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE<br />
                another line
            </td>
         <td>
                <span class="day-number">3</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE
            </td>
         <td>
                <span class="day-number">4</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE
            </td>
                         <td>
                <span class="day-number">5</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE
            </td>
             <td>
                <span class="day-number">6</span>
                CHICKEN QUESADILLA<br />
                SWEET POTATO BITES<br />
                BABY CARROTS<br />
                CUCUMBER SLICES<br />
                WG BISCUIT W/BUTTER CUP - ALL<br />
                PINEAPPLE TIDBITS OR APPLE
            </td>
        </tr>

                    <!-- one row of five days -->
        <tr>
            <td>9 - green eggs</td>
            <td>10 - ham</td>
            <td>11 - green egs</td>
            <td>12 - ham</td>
            <td>13 - greeen eggs</td>
        </tr>

                    <!-- one row of five days -->
        <tr>
            <td>16 - green eggs</td>
            <td>17 - ham</td>
            <td>18 - green egs</td>
            <td>19 - ham</td>
            <td>20 - greeen eggs</td>
        </tr>

                    <!-- one row of five days -->
        <tr>
            <td>23 - green eggs</td>
            <td>24 - ham</td>
            <td>25 - green egs</td>
            <td>26 - ham</td>
            <td>27 - greeen eggs</td>
        </tr>

                    <!-- one row of five days -->
        <tr>
            <td>30 - green eggs</td>
            <td>31 - ham</td>
            <td>1 - green egs</td>
            <td>2 - ham</td>
            <td>3 - greeen eggs</td>
        </tr>

        <tr>
            <td>30 - green eggs</td>
            <td>31 - ham</td>
            <td>1 - green egs</td>
            <td>2 - ham</td>
            <td>3 - greeen eggs</td>
        </tr>
    </tbody>
</table>