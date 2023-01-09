<?php

$to = "recruit@deep-hiring.com"; // емайл получателя данных из формы
$tema = "НОВАЯ ВАКАНСИЯ"; // тема полученного емайла
$message = "Имя: ".$_POST['hire-talent-name']."<br>";//присвоить переменной значение, полученное из формы name=name
$message .= "Номер телефона: ".$_POST['hire-talent-phone']."<br>"; //полученное из формы name=phone
$message .= "E-mail&Telegram: ".$_POST['hire-talent-email']."<br>"; //полученное из формы name=email
$message .= "Компания: ".$_POST['hire-talent-company']."<br>"; 
$message .= "Вакансия: ".$_POST['hire-talent-vacancy']."<br>"; 

$message .= "Сообщение: ".$_POST['hire-talent-message']."<br>"; //полученное из формы name=message
$headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
mail($to, $tema, $message, $headers); //отправляет получателю на емайл значения переменных


?>