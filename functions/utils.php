<?php

function empty2null ($str) {
    if (!strlen($str))
        return null;
    return $str;
}

?>