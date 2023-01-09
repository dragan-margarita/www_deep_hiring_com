<?php

$to = "recruit@deep-hiring.com"; // емайл получателя данных из формы
$tema = "НОВОЕ РЕЗЮМЕ"; // тема полученного емайла
$message = "Имя: ".$_POST['post-cv-name']."<br>";//присвоить переменной значение, полученное из формы name=name
$message .= "Фамилия: ".$_POST['post-cv-last-name']."<br>";//
$message .= "Номер телефона: ".$_POST['post-cv-phone']."<br>"; //полученное из формы name=phone
$message .= "E-mail&Telegram: ".$_POST['post-cv-email']."<br>"; //полученное из формы name=email
$message .= "Сообщение: ".$_POST['post-cv-message']."<br>"; //полученное из формы name=message
$headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
mail($to, $tema, $message, $headers); //отправляет получателю на емайл значения переменных


?>